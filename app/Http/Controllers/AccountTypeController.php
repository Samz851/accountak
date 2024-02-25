<?php

namespace App\Http\Controllers;

use App\Helpers\ArrayFormatters;
use App\Models\AccountType;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountTypeController extends Controller
{
    private function getAll(): array
    {
        return AccountType::with(['childTypes', 'parentType', 'accounts'])
                            ->inRandomOrder()
                            ->paginate(10)
                            ->items();
    }

    private function getSelectOptions(): array
    {
        $accountTypes = AccountType::has('childTypes')
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AccountType $accountType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AccountType $accountType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountType $accountType)
    {
        //
    }
}
