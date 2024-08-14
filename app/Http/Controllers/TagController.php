<?php

namespace App\Http\Controllers;

use App\Models\Tag;
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
}
