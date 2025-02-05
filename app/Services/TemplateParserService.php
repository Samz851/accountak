<?php

namespace App\Services;

use App\Models\Tag;
use App\Models\TransRecord;
use App\Models\Account;

class TemplateParserService
{
    /**
     * The content string.
     *
     * @var string
     */
    private $content;

    /**
     * Start date.
     *
     * @var string
     */
    private $from;

    /**
     * End date.
     *
     * @var string
     */
    private $to;

    /**
     * Array of placeholders.
     *
     * @var array
     */
    private $placeholders = [];

    /**
     * Array of predefined definitions.
     *
     * @var array
     */
    private $definitions = [
        "T|"  => Tag::class,
        "TR|" => TransRecord::class,
        "A|"  => Account::class,
    ];

    /**
     * Constructor for TemplateParserService.
     *
     * @param string $content The long string to be assigned to the content property.
     * @param string $from The starting date.
     * @param string $to The ending date.
     */
    public function __construct(string $content, string $from, string $to)
    {
        $this->content = $content;
        $this->from = $from;
        $this->to = $to;
    }
    
    /**
     * Parses the given template content by replacing placeholders with data provided.
     *
     * In the template string, any occurrence of a placeholder in the format
     * {{key}} will be replaced with its corresponding value.
     *
     * @return string The parsed template with all replacements.
     */
    public function parse(): string
    {
        $definitions = $this->extractPlaceholders($this->content);
        $this->placeholders = $this->buildDefinitions($definitions);
        
        // Additional parsing logic can be implemented here
        
        return json_encode($this->placeholders);
    }
    
    /**
     * Extracts all instances of placeholders matching the pattern {{*}} from the given string.
     *
     * @param string $content The string to search in.
     * @return array An array of all matched placeholder strings.
     */
    private function extractPlaceholders(string $content): array
    {
        // Use a non-greedy regex pattern to match any instance like {{...}}
        preg_match_all('/{{(.*?)}}/', $content, $matches);
        return $matches[1];
    }

    /**
     * Splits the given string by the first occurrence of the "|" character.
     * The first element of the returned array includes all characters before and including the pipe,
     * and the second element contains all characters after the pipe.
     *
     * @param string $input The input string to split.
     * @return array An array with two elements: [prefix including pipe, rest of the string].
     */
    private function splitByPipe(string $input): array
    {
        $pos = strpos($input, '|');
        if ($pos === false) {
            return [$input, ''];
        }
        return [substr($input, 0, $pos + 1), substr($input, $pos + 1)];
    }
    
    /**
     * Processes the extracted definitions by splitting each definition string at the first occurrence of the pipe ("|")
     * and constructing an associative array with keys "T|", "TR|", "A|".
     * Each value in the returned array is an array of the definitions (the part after the "|")
     * that match the particular key.
     *
     * @param array $extractedDefinitions The array returned by extractPlaceholders.
     * @return array An associative array with keys "T|", "TR|", "A|" and values as arrays of definition values.
     */
    private function buildDefinitions(array $extractedDefinitions): array
    {
        $result = [
            "T|"  => [],
            "TR|" => [],
            "A|"  => [],
        ];

        foreach ($extractedDefinitions as $definition) {
            $term = $this->splitByPipe($definition);
            if (array_key_exists($term[0], $result)) {
                $result[$term[0]][] = $term[1];
            }
        }
        return $result;
    }

    /**
     * Returns a JSON representation of the content and its extracted placeholders.
     *
     * @return string JSON encoded string of content details.
     */
    public function toJson(): string
    {
        return json_encode([
            'content'   => $this->content, 
            'extracted' => $this->extractPlaceholders($this->content)
        ]);
    }
} 