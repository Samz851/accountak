<?php
namespace App\Services;

use App\Models\BaseAccount;
use App\Models\Account;
use App\Models\AccountsBranch;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Log;

class AccountQueryBuilder
{
    private string $model;

    private Builder $query;

    private bool $withChildren = false;


    public function __construct(private ?int $offset = 0, private ?int $limit = 20){}

    public function setType(string $type): self
    {
        if ( $type === 'branch' ) {
            $this->model = AccountsBranch::class;
            $this->query = $this->model::query()->offset($this->offset)->limit($this->limit);
        } else if ( $type === 'account') {
            $this->model = Account::class;
            $this->query = $this->model::query();
        }

        return $this;
    }

    public static function getChildren(int $parentId): Collection|array
    {
        $children = AccountsBranch::where('id', $parentId)
                    ->first()
                    ->append('children')
                    ->children;
        return $children;
    }
    public function setParentId(int $parentId): self
    {
        $this->query = $this->query->where('parent_id', $parentId);
        return $this;
    }
    public function setTaxonomy(string $taxonomy): self
    {
        if ( ! $this->model ) {
            $this->query = AccountsBranch::query();
        }

        if ( $taxonomy === 'leaf') {
            $this->query = $this->query->leaves();
        } else if ( $taxonomy === 'root' ) {
            $this->query = $this->query->roots();
        }
        return $this;
    }

    public function executeAccountQuery(): Collection
    {
        $result = $this->query->offset($this->offset)->limit($this->limit)->get();
        return $result;
    }


}