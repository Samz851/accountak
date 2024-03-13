<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;

class ArrayFormatters
{
    public static function rename_array_keys(array $array, array $keys): array
    {
        $newArray = [];
        foreach ($array as $key => $value) {
            if (array_key_exists($key, $keys)) {
                if (is_array($value)) {
                    $newArray[$keys[$key]] = array_map(fn($record) => self::rename_array_keys($record, $keys), $value);
                    // $newArray[$keys[$key]] = array_map([self::class, 'rename_array_keys'], $value, [$keys]);
                } else {
                    $newArray[$keys[$key]] = $value;
                }

            } else {
                $newArray[$key] = $value;
            }
        }
        return $newArray;
    }

    public static function removeLeafAccounts(array $array, int $level): array
    {
        $newArray = [];
        foreach ($array as $key => $value) {
            Log::info([$key, $value], [__LINE__, __FILE__]);
            $pathLength = count(explode('->', $value['tree_path']));
            if ( $pathLength < $level ) {
                Log::info([$pathLength, $value], [__LINE__, __FILE__]);
                if ( isset($value['child_branches']) && ! empty(isset($value['child_branches'])) ) {
                    $value['child_branches'] = self::removeLeafAccounts($value['child_branches'], $level);
                }
                $newArray[$key] = $value;
            }
        }
        return $newArray;
    }
}
