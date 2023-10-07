import MaximumPage from "./MaximumPage";
import OptionPage from "./OptionPage";
import PagesPage from "./PagesPage";
import ReportPage from "./ReportPage";
import SequencePage from "./SequencePage";
import SignaturesPage from "./SignaturesPage";
import StartPage from "./StartPage";

export default class PageManager {
  readonly start: StartPage;
  readonly pages: PagesPage;
  readonly max: MaximumPage;
  readonly signatures: SignaturesPage;
  readonly option: OptionPage;
  readonly sequence: SequencePage;
  readonly report: ReportPage;
  constructor() {
    this.start = new StartPage();
    this.pages = new PagesPage();
    this.max = new MaximumPage();
    this.signatures = new SignaturesPage();
    this.option = new OptionPage();
    this.sequence = new SequencePage();
    this.report = new ReportPage();
  }
}
