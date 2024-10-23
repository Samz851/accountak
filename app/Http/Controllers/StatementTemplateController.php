<?php

namespace App\Http\Controllers;

use App\Models\StatementTemplate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatementTemplateController extends Controller
{
    //

    public function index(Request $request): Response
    {
        $templates = StatementTemplate::all();

        return response($templates);
    }

    public function store(Request $request): Response
    {
        $data = $request->all();
        $template = StatementTemplate::create($data);

        return response($template);
    }

    public function show(StatementTemplate $statementTemplate): Response
    {
        return response($statementTemplate);
    }
}
