<?php

// app/graphql/mutations/category/CreateAccountMutation

namespace App\GraphQL\Mutations\Account;

use App\Models\Account;
use Rebing\GraphQL\Support\Mutation;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;

class CreateAccountMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createAccount',
        'description' => 'Creates an account'
    ];

    public function type(): Type
    {
        return GraphQL::type('Account');
    }

    public function args(): array
    {
        return [
            'name' => [
                'name' => 'name',
                'type' =>  Type::nonNull(Type::string()),
            ],
        ];
    }

    public function resolve($root, $args)
    {
        $category = new Account();
        $category->fill($args);
        $category->save();

        return $category;
    }
}
