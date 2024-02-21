export interface NavigationButton{
    caption?: string,
    routerLink? : string,
    iconClass? : string,
    children? : NavigationButton[], 
    expanded? : boolean,
    selected? : boolean
}