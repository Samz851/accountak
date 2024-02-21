<?php

// app/graphql/mutations/account/DeleteAccountMutation

namespace App\GraphQL\Mutations\Account;

use App\Models\Account;
use Rebing\GraphQL\Support\Mutation;
use GraphQL\Type\Definition\Type;

class DeleteAccountMutation extends Mutation
{
    protected $attributes = [
        'name' => 'deleteAccount',
        'description' => 'deletes a account'
    ];

    public function type(): Type
    {
        return Type::boolean();
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
        $account = Account::findOrFail($args['id']);

        return  $account->delete() ? true : false;
    }
}
