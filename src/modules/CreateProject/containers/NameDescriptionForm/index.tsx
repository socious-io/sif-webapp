import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';

const NameDescriptionForm: React.FC = () => {
  return (
    <div>
      <form>
        <Input label="Project name*" placeholder="What is your project name?" />
        <div className="my-[32px]">
          <Input label="Website (optional)" placeholder="You project’s website if you have one" />
        </div>
        <Button color="primary" block>
          Continue
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-[16px]">
          Cancel
        </Button>
      </form>
    </div>
  );
};
export default NameDescriptionForm;
