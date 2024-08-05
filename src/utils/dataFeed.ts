import { IDropdownType } from "./commonTypes";

export const postStatusDropdown =[
    {text:'Draft',value:'draft'},
    {text:'Published',value:'published'},
    {text:'Scheduled',value:'scheduled'},
    {text:'Failed',value:'failed'}
] as IDropdownType[];

export const teamUserStatusDropdown =[
    {text:'Banned',value:'banned'},
    {text:'Pending',value:'pending'},
    {text:'Active',value:'active'}
] as IDropdownType[];

export const teamUserRoleDropdown =[
    {text:'Publisher',value:'publisher'},
    {text:'Creator',value:'creator'},
    {text:'Admin',value:'admin'}
] as IDropdownType[];