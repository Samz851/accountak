<?php

namespace App\Http\Controllers;

use App\Models\Statement;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatementController extends Controller
{
    //
    public function store(Request $request): Response
    {
        $data = $request->all();
        $template = Statement::create($data);

        return response($template);
    }

    public function show(Request $request, int $statement): Response
    {
        $statement = Statement::find($statement);

        return response($statement);
    }
}
