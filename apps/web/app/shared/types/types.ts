export type ComponentIcon = React.ReactElement<React.ComponentPropsWithoutRef<"svg">>;

export interface UserAuth {
  id: string;
  email: string;
  name: string;
}
