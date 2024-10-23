<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class TagController extends Controller
{
    public function index(Request $request): Response
    {
        return response(Tag::all());
    }

    public function store(Request $request): Response
    {
        $tag = Tag::create($request->all());
        return response($tag);
    }

    public function show(Tag $tag): Response
    {
        $tag = Tag::where('id', $tag->id)
                ->first();
        Log::info([$tag->taggable], [__LINE__, __FILE__]);
        return response($tag);
    }

    public function getTagMembers(Request $request)
    {
        $service = new TagService();
        $tagMembers = $service->getTagMembers($request->id);
        $tagMembersClean = $service->getTagMembersClean($request->id);

        return response([
            'tagMembers' => $tagMembers,
            'tagMembersClean' => $tagMembersClean
        ]);
    }

    public function getTagBalance(Request $request)
    {
        $service = new TagService();
        $tagBalance = $service->getTagMembersBalance($request->id);

        return response([
            'tagBalance' => $tagBalance
        ]);
    }
}
