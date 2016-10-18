import { expect } from "chai";

import { AnalysisWork, SplitOn, SplitWork } from "./analysisWork";

describe("SplitOn", () => {

  const work = new AnalysisWork(["1", "2", "3", "4"], ["a", "b", "c"], ["x","y","z"]);

  it("SplitOn splits on password when chunk means two passwords", () => {
      const splits = SplitOn(work.passwords, [work.passwordDictionary, work.ruleSet], 18);
      const splitWork = splits.map(split => new AnalysisWork(split[0], split[1], split[2]));

      expect(splitWork.length).to.be.equal(2);
      expect(JSON.stringify(splitWork[0])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[1])).to.be.equal(
          JSON.stringify(new AnalysisWork(["3", "4"], ["a", "b", "c"], ["x","y","z"]))
          );
  });

  it("SplitOn splits on password into undersized chunks when chunk means 1.5 passwords", () => {
      const splits = SplitOn(work.passwords, [work.passwordDictionary, work.ruleSet], 14);
      const splitWork = splits.map(split => new AnalysisWork(split[0], split[1], split[2]));

      expect(splitWork.length).to.be.equal(4);
      expect(JSON.stringify(splitWork[0])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[1])).to.be.equal(
          JSON.stringify(new AnalysisWork(["2"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[2])).to.be.equal(
          JSON.stringify(new AnalysisWork(["3"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[3])).to.be.equal(
          JSON.stringify(new AnalysisWork(["4"], ["a", "b", "c"], ["x","y","z"]))
          );
  });

  it("SplitOn won't split further than 1 password", () => {
      const splits = SplitOn(work.passwords, [work.passwordDictionary, work.ruleSet], 1);
      const splitWork = splits.map(split => new AnalysisWork(split[0], split[1], split[2]));

      expect(splitWork.length).to.be.equal(4);
           expect(JSON.stringify(splitWork[0])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[1])).to.be.equal(
          JSON.stringify(new AnalysisWork(["2"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[2])).to.be.equal(
          JSON.stringify(new AnalysisWork(["3"], ["a", "b", "c"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[3])).to.be.equal(
          JSON.stringify(new AnalysisWork(["4"], ["a", "b", "c"], ["x","y","z"]))
          );
  });

  it("SplitOn won't split if not needed", () => {
      const splits = SplitOn(work.passwords, [work.passwordDictionary, work.ruleSet], 36);
      const splitWork = splits.map(split => new AnalysisWork(split[0], split[1], split[2]));

      expect(splitWork.length).to.be.equal(1);
      expect(JSON.stringify(splitWork[0])).to.be.equal(JSON.stringify(work)
            );
  });

    it("SplitOn splits on passwordDictionary", () => {
      const splits = SplitOn(work.passwordDictionary, [work.passwords, work.ruleSet], 12);
      const splitWork = splits.map(split => new AnalysisWork(split[1], split[0], split[2]));

      expect(splitWork.length).to.be.equal(3);
      expect(JSON.stringify(splitWork[0])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2", "3", "4"], ["a"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[1])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2", "3", "4"], ["b"], ["x","y","z"]))
          );
      expect(JSON.stringify(splitWork[2])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2", "3", "4"], ["c"], ["x","y","z"]))
          );
  });

  it("SplitOn splits on ruleSet", () => {
      const splits = SplitOn(work.ruleSet, [work.passwords, work.passwordDictionary], 12);
      const splitWork = splits.map(split => new AnalysisWork(split[1], split[2], split[0]));

      expect(splitWork.length).to.be.equal(3);
      expect(JSON.stringify(splitWork[0])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2", "3", "4"], ["a", "b", "c"], ["x"]))
          );
      expect(JSON.stringify(splitWork[1])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2", "3", "4"], ["a", "b", "c"], ["y"]))
          );
      expect(JSON.stringify(splitWork[2])).to.be.equal(
          JSON.stringify(new AnalysisWork(["1", "2", "3", "4"], ["a", "b", "c"], ["z"]))
          );
  });
});

describe("SplitWork", () => {

  const work = new AnalysisWork(
      ["1", "2", "3"], ["a", "b", "c", "d","e"], ["q","r","s","t","w","x","y","z"]
      );


  it("SplitWork splits up work on password first", () => {
      const expectedWork = [
          new AnalysisWork(["1"], ["a", "b", "c", "d","e"], ["q","r","s","t","w","x","y","z"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d","e"], ["q","r","s","t","w","x","y","z"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d","e"], ["q","r","s","t","w","x","y","z"])
      ]

      const splitWork = SplitWork(work, 40);

      expect(JSON.stringify(splitWork)).to.be.equal(JSON.stringify(expectedWork));
  });

  it("SplitWork splits up work on password first then rules", () => {
      const expectedWork = [
          new AnalysisWork(["1"], ["a", "b", "c", "d","e"], ["q","r","s","t"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d","e"], ["w","x","y","z"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d","e"], ["q","r","s","t",]),
          new AnalysisWork(["2"], ["a", "b", "c", "d","e"], ["w","x","y","z"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d","e"], ["q","r","s","t"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d","e"], ["w","x","y","z"])
      ]

      const splitWork = SplitWork(work, 20);

      expect(JSON.stringify(splitWork)).to.be.equal(JSON.stringify(expectedWork));
  });

  it("SplitWork splits up work on password first then rules and then passwordDictionary", () => {

      const expectedWork = [
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["q"]),
          new AnalysisWork(["1"], ["e"], ["q"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["r"]),
          new AnalysisWork(["1"], ["e"], ["r"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["s"]),
          new AnalysisWork(["1"], ["e"], ["s"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["t"]),
          new AnalysisWork(["1"], ["e"], ["t"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["w"]),
          new AnalysisWork(["1"], ["e"], ["w"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["x"]),
          new AnalysisWork(["1"], ["e"], ["x"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["y"]),
          new AnalysisWork(["1"], ["e"], ["y"]),
          new AnalysisWork(["1"], ["a", "b", "c", "d"], ["z"]),
          new AnalysisWork(["1"], ["e"], ["z"]),

          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["q"]),
          new AnalysisWork(["2"], ["e"], ["q"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["r"]),
          new AnalysisWork(["2"], ["e"], ["r"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["s"]),
          new AnalysisWork(["2"], ["e"], ["s"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["t"]),
          new AnalysisWork(["2"], ["e"], ["t"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["w"]),
          new AnalysisWork(["2"], ["e"], ["w"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["x"]),
          new AnalysisWork(["2"], ["e"], ["x"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["y"]),
          new AnalysisWork(["2"], ["e"], ["y"]),
          new AnalysisWork(["2"], ["a", "b", "c", "d"], ["z"]),
          new AnalysisWork(["2"], ["e"], ["z"]),

          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["q"]),
          new AnalysisWork(["3"], ["e"], ["q"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["r"]),
          new AnalysisWork(["3"], ["e"], ["r"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["s"]),
          new AnalysisWork(["3"], ["e"], ["s"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["t"]),
          new AnalysisWork(["3"], ["e"], ["t"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["w"]),
          new AnalysisWork(["3"], ["e"], ["w"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["x"]),
          new AnalysisWork(["3"], ["e"], ["x"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["y"]),
          new AnalysisWork(["3"], ["e"], ["y"]),
          new AnalysisWork(["3"], ["a", "b", "c", "d"], ["z"]),
          new AnalysisWork(["3"], ["e"], ["z"]),
      ]

      const splitWork = SplitWork(work, 4);

      expect(JSON.stringify(splitWork)).to.be.equal(JSON.stringify(expectedWork));
  });

  it("SplitWork splits until 1*1*1 problem", () => {
      const work = new AnalysisWork(
        ["1", "2"], ["a", "b"], ["q","r","s"]
      );

      const expectedWork = [
          new AnalysisWork(["1"], ["a"], ["q"]),
          new AnalysisWork(["1"], ["b"], ["q"]),
          new AnalysisWork(["1"], ["a"], ["r"]),
          new AnalysisWork(["1"], ["b"], ["r"]),
          new AnalysisWork(["1"], ["a"], ["s"]),
          new AnalysisWork(["1"], ["b"], ["s"]),
          new AnalysisWork(["2"], ["a"], ["q"]),
          new AnalysisWork(["2"], ["b"], ["q"]),
          new AnalysisWork(["2"], ["a"], ["r"]),
          new AnalysisWork(["2"], ["b"], ["r"]),
          new AnalysisWork(["2"], ["a"], ["s"]),
          new AnalysisWork(["2"], ["b"], ["s"]),
      ]

      const splitWork = SplitWork(work, 0);

      expect(JSON.stringify(splitWork)).to.be.equal(JSON.stringify(expectedWork));
  });
});