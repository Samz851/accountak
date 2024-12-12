<?php

namespace App\Http\Controllers;

use App\Models\Formula;
use Illuminate\Http\Request;

class FormulaController extends Controller
{
    //
    public function index()
    {
        $formulas = Formula::all();
        return response()->json($formulas);
    }

    public function store(Request $request)
    {
        $formula = Formula::create($request->all());
        return response()->json($formula, 201);
    }

    public function update(Request $request, $id)
    {
        $formula = Formula::findOrFail($id);
        $formula->update($request->all());
        return response()->json($formula, 200);
    }

    public function destroy($id)
    {
        $formula = Formula::findOrFail($id);
        $formula->delete();
        return response()->json(['message' => 'Formula deleted successfully'], 204);
    }
}
