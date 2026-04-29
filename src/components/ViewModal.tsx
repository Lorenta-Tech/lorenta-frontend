import { UploadedFile } from "../types";
import Modal from "./Modal";
import FileViewer from "./FileViewer";

type Props = {
  file: UploadedFile | null;
  onClose: () => void;
  convertedPdfUrl?: string;
};

const ViewModal: React.FC<Props> = ({ file, onClose, convertedPdfUrl }) => {
  if (!file) return null;

  return (
    <Modal title={file.name} onClose={onClose}>
      <FileViewer file={file} convertedPdfUrl={convertedPdfUrl} />
    </Modal>
  );
};

export default ViewModal;