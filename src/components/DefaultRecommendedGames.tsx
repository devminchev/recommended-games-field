import { Select, FormControl } from "@contentful/f36-components";
import { useRecommendedGames } from "../hooks";

const DefaultRecommendedGames = () => {
  const { value, recommendedGames, handleChange } = useRecommendedGames();

  return (
    <FormControl key="games" style={{ marginBottom: '0px' }}>
      <Select
        id="games"
        name="games"
        value={JSON.stringify(value)}
        onChange={handleChange}
      >
        <Select.Option key="none" value={JSON.stringify([])}>
          Select an option
        </Select.Option>
        {Object.entries(recommendedGames).map(([key, value]) => {
          return (
            <Select.Option key={key} value={JSON.stringify(value)}>
              {key.toUpperCase()} Suggested Games
            </Select.Option>
          );
        })}
      </Select>
      {value?.length === 0 && (
        <FormControl.ValidationMessage>
          Required Field
        </FormControl.ValidationMessage>
      )}
    </FormControl>
  );
};

export default DefaultRecommendedGames;
