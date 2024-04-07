<?php

namespace App\Http\Controllers;

use App\Models\Options;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OptionsController extends Controller
{
    //

    public function store( Request $request ): Response
    {
        $options = $request->user()->organization->options()->create($request->all());
        return response($options);
    }
}
