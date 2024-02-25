<?php

namespace App\Helpers;

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
}
