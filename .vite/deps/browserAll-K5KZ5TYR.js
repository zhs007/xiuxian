import {
  AccessibilitySystem,
  DOMPipe,
  EventSystem,
  FederatedContainer,
  accessibilityTarget
} from "./chunk-JIWS6O2B.js";
import "./chunk-AXJEBLKI.js";
import "./chunk-XHFZTJBU.js";
import "./chunk-JBRZQJOI.js";
import {
  Container,
  extensions
} from "./chunk-XG62LP2N.js";

// node_modules/pixi.js/lib/accessibility/init.mjs
extensions.add(AccessibilitySystem);
extensions.mixin(Container, accessibilityTarget);

// node_modules/pixi.js/lib/events/init.mjs
extensions.add(EventSystem);
extensions.mixin(Container, FederatedContainer);

// node_modules/pixi.js/lib/dom/init.mjs
extensions.add(DOMPipe);
//# sourceMappingURL=browserAll-K5KZ5TYR.js.map
