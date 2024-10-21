<?php

namespace App\Services;

use App\Models\Tag;

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
        return $tag->members;
    }
}