import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Link,
  Divider,
  ModalHeader,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
          <ModalHeader className="text-xl font-bold">SUTRA PRICING</ModalHeader>
          <ModalBody>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg">SUTRA MultiLingual Series Models</p>
                  <p className="font-mono text-small text-blue-500">SUTRA-50B-ML</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per Million Tokens)</div>
                  <div>$1.00</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per Million Tokens)</div>
                  <div>$1.00</div>
                </div>
              </CardBody>
              <Divider />
              <CardFooter className='flex flex-col'>
                <div className="flex flex-col justify-between w-full">
                  <div>Language Add-on</div>
                  <div>$1.00-$2.20 per 1,000 requests</div>
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div>Long-Term Memory Add-on</div>
                  <div>$5 per 1,000 requests</div>
                </div>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg">SUTRA Online Series Models</p>
                  <p className="font-mono text-small text-blue-500">SUTRA-50B-ML</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>Input (per Million Tokens)</div>
                  <div>$1.00</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>Output (per Million Tokens)</div>
                  <div>$1.00</div>
                </div>
              </CardBody>
              <Divider />
              <CardFooter className='flex flex-col'>
                <div className="flex flex-col justify-between w-full">
                  <div>Search Add-on</div>
                  <div>$3.00 per 1,000 requests</div>
                </div>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-lg">SUTRA Avatar Models</p>
                  <p className="font-mono text-small text-blue-500">SUTRA-50B-ML</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-row justify-between">
                  <div>SUTRA-Avatar (per Video/Stream request)</div>
                  <div>$0.30*</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>SUTRA-Avatar-Realtime (per Video/Stream request)</div>
                  <div>$0.50*</div>
                </div>
              </CardBody>
              <Divider />
            </Card>
            {/* 
                  
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
                  */}
            <Link className='w-full justify-end' isExternal href="https://www.two.ai/contact">
              Contact us for more information
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
