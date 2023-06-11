import { globalElements } from "../variables/objects";
import { addPortalGlyphButtons } from "../modules/portalglyphs";

addPortalGlyphButtons(globalElements.output.portalglyphButtons as HTMLElement, 'portalglyphsInput');