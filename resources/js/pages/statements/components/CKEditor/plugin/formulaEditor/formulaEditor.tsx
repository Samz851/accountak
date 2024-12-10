// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
// import { Editor } from '@ckeditor/ckeditor5-core';
import { Plugin, ButtonView, View } from 'ckeditor5'


export default class FormulaPlugin extends Plugin {
    // constructor(editor: Editor) {
    //     super(editor);
    // }

    // public static get pluginName(): string {
    //     return 'FormulaPlugin';
    // }

    public init(): void {
        const editor = this.editor;

        // Add the formula button to the toolbar
        editor.ui.componentFactory.add('insertFormula', locale => {
            const button = new ButtonView(locale);

            button.set({
                label: 'Insert Formula',
                tooltip: true,
                withText: true
            });

            // Open formula input dialog on click
            button.on('execute', () => {
                this.openFormulaDialog();
            });

            return button;
        });
    }

    private openFormulaDialog(): void {
        const editor = this.editor;
        const predefinedVariables: string[] = ['x', 'y', 'z']; // Define allowed variables

        const formula = prompt(
            'Enter your formula using predefined variables like {x}, {y}, {z}.\nExample: SUM({x}, {y})'
        );

        if (formula) {
            const isValid = predefinedVariables.every(variable =>
                formula.includes(`{${variable}}`) || !formula.includes('{')
            );

            if (!isValid) {
                alert('Invalid formula! Use only predefined variables like {x}, {y}, {z}.');
                return;
            }

            editor.model.change(writer => {
                const formulaText = writer.createText(`Formula: ${formula}`);
                const formulaElement = writer.createElement('span', { class: 'formula' });
                writer.append(formulaText, formulaElement);
                editor.model.insertContent(formulaElement, editor.model.document.selection);
            });
        }
    }
}
