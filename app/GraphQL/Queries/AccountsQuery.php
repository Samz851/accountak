<?php

// app/graphql/queries/account/AccountsQuery

namespace App\GraphQL\Queries\Account;

use App\Models\Account;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class AccountsQuery extends Query
{
    protected $attributes = [
        'name' => 'accounts',
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('Account'));
    }

    public function resolve($root, $args)
    {
        return Account::all();
    }
}
