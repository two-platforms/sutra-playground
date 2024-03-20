import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  ModalHeader,
} from '@nextui-org/react';

export default function Pricing() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Link size="sm" className=" hover:cursor-pointer" onPress={onOpen}>
        SUTRA PRICING
      </Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">SUTRA PRICING</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  <div className=" text-lg font-bold">SUTRA-Online Series</div>
                  <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn> </TableColumn>
                      <TableColumn>Input (per Million Tokens)</TableColumn>
                      <TableColumn>Output (per Million Tokens)</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>SUTRA-50B-Online</TableCell>
                        <TableCell>$1.00</TableCell>
                        <TableCell>$1.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="pl-3 text-sm text-gray-500">
                    <div>Search Add-on</div>
                    <div className="pl-3">$3 per 1,000 requests</div>
                  </div>
                  <Divider className="mb-3" />
                  <div className=" text-lg font-bold">SUTRA-Multilingual Series</div>
                  <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn> </TableColumn>
                      <TableColumn>Input (per Million Tokens)</TableColumn>
                      <TableColumn>Output (per Million Tokens)</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>SUTRA-50B-ML</TableCell>
                        <TableCell>$1.00</TableCell>
                        <TableCell>$1.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="pl-3 text-sm text-gray-500">
                    <div>Language Add-on</div>
                    <div className="pl-3">$1.00-$2.20 per 1,000 requests</div>
                    <div>Long-Term Memory Add-on</div>
                    <div className="pl-3">$5 per 1,000 requests</div>
                  </div>
                  <Divider className="mb-3" />
                  <div className=" text-lg font-bold">SUTRA-Avatar Series</div>
                  <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn> </TableColumn>
                      <TableColumn>Custom Avatar Creation</TableColumn>
                      <TableColumn>Per Video/Stream Request</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>SUTRA-Avatar</TableCell>
                        <TableCell>Contact us</TableCell>
                        <TableCell>$0.30*</TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell>SUTRA-Avatar-Realtime</TableCell>
                        <TableCell>Contact us</TableCell>
                        <TableCell>$0.50</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="pl-3 text-sm text-gray-500">*Subject to customization options.</div>
                  <Divider />
                </div>
                <Link isExternal href="https://www.two.ai/contact">
                  Contact US
                </Link>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
