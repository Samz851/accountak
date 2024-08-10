<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TagController extends Controller
{
    public function index(Request $request): Response
    {
        return response(Tag::all());
    }
}
