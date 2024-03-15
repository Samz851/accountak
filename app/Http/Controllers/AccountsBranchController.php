<?php

namespace App\Http\Controllers;

use App\Helpers\ArrayFormatters;
use App\Models\AccountsBranch;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class AccountsBranchController extends Controller
{
    private function getAll(): Collection
    {
        return AccountsBranch::with(['childBranches', 'parentBranch', 'accounts'])
                            ->get();
    }

    private function getTree(): array
    {
        $accountTypes = ArrayFormatters::removeEmptyItems(AccountsBranch::doesntHave('parentBranch')->get()->toArray());
        return array_map(fn($record)=> ArrayFormatters::rename_array_keys($record, [
            "name" => "label",
            "id" => "value",
            "child_branches" => "children"
        ]), $accountTypes);

    }

    private function getSelectOptions(?bool $noChildren = null): array
    {
        if ($noChildren) {
            $accountTypes = AccountsBranch::doesntHave('childBranches')
            ->get()
            ->toArray();
        } else {
            $accountTypes = AccountsBranch::doesntHave('parentBranch')
            ->get()
            ->toArray();

            $accountTypes = ArrayFormatters::removeLeafAccounts($accountTypes, 5);
        }

        return array_map(fn($record) => ArrayFormatters::rename_array_keys($record, [
            "name" => "title",
            "id" => "key",
            "child_branches" => "children"
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
        } else if ($request->has('noChildren')) {
            $result = $this->getSelectOptions(true);
        }else {
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
        $accountBranch->parentBranch;
        // Log::info($accountBranch->parentBranch, [__LINE__, __FILE__]);
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
        $accountBranch = AccountsBranch::with('parentBranch')->where('id', $request->query('id'))->get();
        return response($accountBranch);
    }
}
