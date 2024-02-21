<?php

// app/graphql/mutations/account/UpdateAccountMutation

namespace App\GraphQL\Mutations\Account;

use App\Models\Account;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;

class UpdateAccountMutation extends Mutation
{
    protected $attributes = [
        'name' => 'updateAccount',
        'description' => 'Updates a account'
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
                'type' =>  Type::nonNull(Type::int()),
            ],
            'name' => [
                'name' => 'name',
                'type' =>  Type::nonNull(Type::string()),
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $account = Account::findOrFail($args['id']);
        $account->fill($args);
        $account->save();

        return $account;
    }
}
