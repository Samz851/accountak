import { Plate, PlateContent } from '@udecode/plate-common';
 
export default function BasicEditor() {
    const initialValue = [
        {
          type: 'p',
          children: [
            {
              text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
            },
          ],
        },
      ];
  return (
    <Plate initialValue={initialValue}>
      <PlateContent />
    </Plate>
  );
}