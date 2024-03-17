<?php

namespace App\Enums;

enum BaseAccountTaxonomy: string
{
    case LEAF = 'leaf';
    case BRANCH = 'branch';
}