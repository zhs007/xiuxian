/**
 * Represents the state of the start screen.
 * This class is responsible for the logic of the start screen,
 * such as which button is currently being interacted with.
 * It is separated from the rendering to allow for easier testing and maintenance.
 */
export class StartScreenLogic {
    /** The currently hovered button. Can be 'new', 'continue', or null. */
    hoveredButton = null;
    /**
     * Sets the currently hovered button.
     * This would be called by the rendering layer when a pointer event occurs.
     * @param button - The button being hovered, or null if no button is hovered.
     */
    setHoveredButton(button) {
        this.hoveredButton = button;
        // In a real game, this might emit an event that the view layer subscribes to.
    }
}
//# sourceMappingURL=startScreen.js.map