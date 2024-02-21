<?php

// app/graphql/types/AccountType

namespace App\GraphQL\Types;

use App\Models\Account;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class AccountType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Account',
        'description' => 'Collection of categories',
        'model' => Account::class
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'ID of account'
            ],
            'title' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'Title of the account'
            ],
            'accounts' => [
                'type' => Type::listOf(GraphQL::type('account')),
                'description' => 'List of accounts'
            ]
        ];
    }
}
