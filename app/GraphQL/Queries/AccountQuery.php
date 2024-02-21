<?php

// app/graphql/queries/Account/AccountQuery

namespace App\GraphQL\Queries\Account;

use App\Models\Account;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Query;

class AccountQuery extends Query
{
    protected $attributes = [
        'name' => 'account',
    ];

    public function type(): Type
    {
        return GraphQL::type('Account');
    }

    public function args(): array
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int(),
                'rules' => ['required']
            ]
        ];
    }

    public function resolve($root, $args)
    {
        return Account::findOrFail($args['id']);
    }
}
