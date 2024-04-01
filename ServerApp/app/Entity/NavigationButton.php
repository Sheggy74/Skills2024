<?php

namespace App\Entity;

class NavigationButton
{

    private $caption;
    private $iconClass;
    private $routerLink;
    private $children = null;

    public function __construct(array $data)
    {
        $this->caption = $data['caption'];
        $this->iconClass = $data['iconClass'];
        $this->routerLink = $data['routerLink'];
        $this->children = array_key_exists('children', $data) ? $data['children'] : null;
    }


    public function getCaption()
    {
        return $this->caption;
    }

    public function getChildren(): array | null
    {
        return $this->children;
    }

    public function setChildren(mixed $children): void
    {
        $this->children = $children;
    }

    public function setCaption($caption): void
    {
        $this->caption = $caption;
    }


    public function getIconClass()
    {
        return $this->iconClass;
    }

    public function setIconClass($iconClass): void
    {
        $this->iconClass = $iconClass;
    }

    public function getRouterLink()
    {
        return $this->routerLink;
    }

    public function setRouterLink($routerLink): void
    {
        $this->routerLink = $routerLink;
    }

}
