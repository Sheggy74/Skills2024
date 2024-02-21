/* import { ActionReducer, Action, createReducer, on, createAction, props } from '@ngrx/store';
import { NavigationButton } from '../Models/NavigationButton';

export interface Application{
	href? : string
	buttons?: NavigationButton[]
	caption? : string
}

export const CHANGE_APP = "CHANGE_APP"

export const addAppAction = createAction(CHANGE_APP)
export const appReducer = createReducer(state: any, on(addAppAction,  )) 

export function changeApplication(state: Application = {}, action: Action) {
	if(action.type == CHANGE_APP){
		return 
	}
	action.
	return state
}
 */