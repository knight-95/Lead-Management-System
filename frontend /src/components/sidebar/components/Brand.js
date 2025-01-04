// Chakra imports
import { Flex, Image, useColorModeValue, Link } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex align="center" direction="column">
      <Link href="/admin/default">
        <Image
          src="/udaan.png"
          alt="udaan"
          width="10rem"
          mb="2rem"
          mt="1rem"
          cursor="pointer"
        />
      </Link>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
