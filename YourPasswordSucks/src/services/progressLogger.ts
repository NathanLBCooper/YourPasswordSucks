export class ProgressLogger {
    private workUnitsComplete = 0;
    private totalWorkUnits= 0;

    constructor(private updateUi: (progress: string) => void) {
    }

    public setTotalWorkUnits(units: number) {
        this.totalWorkUnits = units;
    }

    public reportWorkUnitComplete() {
        ++this.workUnitsComplete;
        this.updateUi(this.workUnitsComplete + " of " + this.totalWorkUnits + " chunks of work complete.");
    }
}