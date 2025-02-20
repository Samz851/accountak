<?php

namespace App\Http\Controllers;

use App\Models\Statement;
use App\Models\StatementTemplate;
use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class StatementController extends Controller
{
    //

    public function index(Request $request): Response
    {
        $templates = Statement::all();

        return response($templates);
    }

    public function store(Request $request): Response
    {
        $data = $request->all();

        $template = StatementTemplate::find($data['template_id']);

        $report = Statement::create([
            'title' => $template->title,
            'content' => $this->templateParser($template->content, $data['from'], $data['to']),
            'template_id' => $template->id,
            'from' => $data['from'],
            'to' => $data['to']
        ]);

        return response($report);
    }

    public function show(Request $request, int $statement): Response
    {
        $statement = Statement::find($statement);

        return response($statement);
    }

    private function templateParser(string $template, $from, $to): string
    {
        $service = new TagService();

        $newtemplate = preg_match_all('/\{\{(\w+)\}\}/', $template, $matches);
        $fields = array_combine($matches[0], $matches[1]);
        $fieldsProcessed = [];
        foreach ($fields as $key => $value) {
            $tag = Tag::where('label', $value)->first();
            $tagBalance = $service->getTagMembersBalanceByRange($tag->id, $from, $to);
            $fieldsProcessed[$key] = $tagBalance;
        }

        $templateProcessed = str_replace(array_keys($fieldsProcessed), array_values($fieldsProcessed), $template);

        Log::info($matches, [__LINE__, __FILE__]);
        Log::info($fields, [__LINE__, __FILE__]);
        Log::info($fieldsProcessed, [__LINE__, __FILE__]);
        Log::info($templateProcessed, [__LINE__, __FILE__]);
        return $templateProcessed;
    }
}
