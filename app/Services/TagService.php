<?php

namespace App\Services;

use App\Helpers\ArrayFormatters;
use App\Models\Tag;
use Illuminate\Support\Facades\Log;

class TagService
{
    public function getAllTags()
    {
        return Tag::all();
    }

    public function getTagById($id): Tag
    {
        return Tag::findOrFail($id);
    }

    public function createTag($data): Tag
    {
        return Tag::create($data);
    }

    public function updateTag($id, $data): Tag
    {
        $tag = $this->getTagById($id);
        $tag->update($data);
        return $tag;
    }

    public function deleteTag($id): bool
    {
        $tag = $this->getTagById($id);
        return $tag->delete();
    }

    public function getTagMembers($id)
    {
        $tag = $this->getTagById($id);
        return ['accounts' => $tag->accounts,
                'branches' => $tag->branches];
    }

    public function getTagMembersClean($id): array
    {
        $members = $this->getTagMembers($id);
        // Log::info($members, [__LINE__, __FILE__]);
        ['accounts' => $accounts, 'branches' => $branches] = $members;
        // $rawMembbers = [];
        // Check for root
        $branchesCodes = $branches->pluck('code')->toArray();
        $codes = array_merge($accounts->pluck('code')->toArray(), $branchesCodes);
        $unique_codes = ArrayFormatters::eliminate_prefixes($codes);
        // usort($branchesCodes, function ($a, $b) { 
        //     if (strlen($a) > strlen($b)) {
        //         return 1;
        //     } else if (strlen($a) < strlen($b)) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // });
        Log::info($codes, [__LINE__, __FILE__]);

                Log::info($unique_codes, [__LINE__, __FILE__]);

        $branches->each(function($branch) use ($accounts, $branches) {
            if ($branch->parent_id === null) {
                $branchCode = $branch->code;
                $accounts = $accounts->filter(function($account) use ($branchCode) {

                    $remove = AccountServices::isDescendantOrAncestorByCode($branchCode, $account->code);
                    // Log::info([$branchCode, $account->code, $remove], [__LINE__, __FILE__]);
                    return $remove === false;
                });
                // Log::info($accounts, [__LINE__, __FILE__]);

                $branches = $branches->filter(function($branch) use ($branchCode) {
                    if ($branch->code === $branchCode) {
                        return false;
                    }
                    return ! AccountServices::isDescendantOrAncestorByCode($branchCode, $branch->code);
                });
            };
        });

        return ['accounts' => $accounts, 'branches' => $branches];
    }
    public function getTagMembersBalance($id)
    {
        $tag = $this->getTagById($id);
        return $tag->taggable->sum('balance');
    }
}