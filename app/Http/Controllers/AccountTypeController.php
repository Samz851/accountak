<?php

namespace App\Http\Controllers;

use App\Helpers\ArrayFormatters;
use App\Models\AccountsBranch;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class AccountTypeController extends Controller
{
    private function getAll(): Collection
    {
        return AccountsBranch::with(['childTypes', 'parentType', 'accounts'])
                            ->get();
    }

    private function getTree(): array
    {
        $accountTypes = AccountsBranch::doesntHave('parentType')->get()->toArray();
        return array_map(fn($record)=> ArrayFormatters::rename_array_keys($record, [
            "name" => "title",
            "id" => "key",
            "child_types" => "children"
        ]), $accountTypes);

    }

    private function getSelectOptions(): array
    {
        $accountTypes = AccountsBranch::has('childTypes')
                                    ->doesntHave('parentType')
                                    ->get()
                                    ->toArray();

        return array_map(fn($record) => ArrayFormatters::rename_array_keys($record, [
            "name" => "title",
            "id" => "value",
            "child_types" => "children"
        ]), $accountTypes);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        if ($request->has('selectOptions')) {

            $result = $this->getSelectOptions();

        } else if ($request->has('tree')) {
            $result = $this->getTree();
        } else {
            $result = $this->getAll();
        }

        return response($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $accountBranch = AccountsBranch::create($request->all());
        return response($accountBranch);
    }

    /**
     * Display the specified resource.
     */
    public function show(AccountsBranch $accountBranch)
    {
        $accountBranch->accounts;
        $accountBranch->child_types;
        $accountBranch->parentType;
        // Log::info($accountBranch->parentType, [__LINE__, __FILE__]);
        return response($accountBranch);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AccountsBranch $accountBranch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountsBranch $accountBranch)
    {
        Schema::disableForeignKeyConstraints();
        $delete = AccountsBranch::truncate();
        Schema::enableForeignKeyConstraints();
        $types = AccountsBranch::all();
        return response([$delete, $types]);
    }



    // DEV
    public function getParents(Request $request): Response
    {
        $accountBranch = AccountsBranch::with('parentType')->where('id', $request->query('id'))->get();
        return response($accountBranch);
    }
}
