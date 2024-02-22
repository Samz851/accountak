<?php

namespace App\Http\Controllers;

use App\Models\AccountType;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountTypeController extends Controller
{
/**
 * Renames one key, or a hierarchy of keys,
 * of a multidimensional associative array.
 *
 * @param array $array
 * @param array $old_keys Hierarchy of keys to rename.
 * @param array $new_keys Hierarchy of replacement keys.
 *                        It must have the same
 *                        number of elements of $old_keys.
 * @return array
 */
private function &rename_array_keys( &$array, $old_keys, $new_keys ) {
  $new_array = array();

  // With each recursive call we extract one key
  // from each of the two arrays of keys.
  $old_key = array_shift( $old_keys );
  $new_key = array_shift( $new_keys );

  foreach ( $array as $key => &$value ) {
    // When this check succeeds it does mean that
    // we have found the key to rename.
    if ( $key === $old_key ) {
      if (
        // When $old_keys and $new_keys still contain
        // elements it does mean that we are renaming
        // a hierarchy of keys, not just a single key.
        $old_keys && $new_keys &&

        // Ensures that the recursive call is triggered
        // only if $value is an array and actually
        // contains the next key to rename ( $old_keys[0] ).
        isset( $value[$old_keys[0]] )
      ) {
        $new_array[$new_key] = $this->rename_array_keys( $value, $old_keys, $new_keys );
      }
      else {
        $new_array[$new_key] = $value;
      }
    }
    else {
      $new_array[$key] = $value;
    }
  }

  return $new_array;
}

    private function renameAttributesForTreeData(array $array)
    {
        $keys = [
            "name" => "title",
            "id" => "value",
            "child_types" => "children"
        ];
        $newKeys = ["title", "value", "children"];
        $newArray = [];
        foreach ($array as $key => $value) {
            if (array_key_exists($key, $keys)) {
                if (is_array($value)) {
                    $newArray[$keys[$key]] = array_map([$this, 'renameAttributesForTreeData'], $value);
                } else {
                    $newArray[$keys[$key]] = $value;
                }

            } else {
                $newArray[$key] = $value;
            }

        }
        return $newArray;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $results = AccountType::has('childTypes')
            ->doesntHave('parentType')
            ->get()
            ->toArray();
        $resultsAdjusted = array_map(fn($result) => $this->renameAttributesForTreeData($result), $results);
        // $this->rename_array_keys($results, ["name", "id", "child_types"], ["title", "value", "children"]);
        return response($resultsAdjusted);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AccountType $accountType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AccountType $accountType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AccountType $accountType)
    {
        //
    }
}
