import { Box } from '@chakra-ui/react'
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const TopMenu = () => {
  return (
    <><Box
    marginTop={2}
    padding="4px 12px"
    className={"hover:text-white cursor-pointer"}
  >
    <FontAwesomeIcon icon={faHouse} />{" "}
    <span className={"ml-[12px] text-[14px]"}>Home</span>
  </Box>
  <Box
    marginTop={2}
    padding="4px 12px"
    className={"hover:text-white cursor-pointer"}
  >
    <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
    <span className={"ml-[12px] text-[14px]"}>Search</span>
  </Box>
  </>
  )
}

export default TopMenu