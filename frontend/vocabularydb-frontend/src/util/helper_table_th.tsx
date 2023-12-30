import { Center, Group, Table, UnstyledButton, Text, rem } from "@mantine/core";
import TableThProps from "../model/TableThProps";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

export default function TableTh({ children, reversed, sorted, onSort }: TableThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <Table.Th >
        <UnstyledButton onClick={onSort} >
          <Group justify="space-between">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </Table.Th>
    );
  }