import { Service } from "typedi";

export interface ICompareDates {
    compare(): boolean;
}

@Service("compare-dates.logic")
export class CompareDatesLogic implements ICompareDates {

    public compare(): boolean {
        return true;
    }

}
