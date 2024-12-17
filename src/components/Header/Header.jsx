import Logo from '../Logo/Logo';
import SelectUser from '../SelectUser/SelectUser';

const logos = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXfRh7Bz29Ta69kKPipZv2gwyhwoxRrJwD4w&s',
  '/public/logo.svg',
];

function Header() {
  return (
    <>
      <Logo image={logos[1]} />
      <SelectUser />
    </>
  );
}

export default Header;
