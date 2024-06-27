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


    public function __construct(private ?int $offset = null, private ?int $limit = null){}

    public function setType(string $type): self
    {
        if ( $type === 'branch' ) {
            $this->model = AccountsBranch::class;
            $this->query = $this->model::query();
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
                    ->append('subitems')
                    ->subitems;
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
        $result = $this->query;
        // Log::info(['offset' => $this->offset, 'limit' => $this->limit], [__LINE__, __FILE__]);
        if ( $this->offset && $this->limit ) {
            $result = $result->offset($this->offset)->limit($this->limit);
        }
        
        return $result->get()->append('children');
    }


}