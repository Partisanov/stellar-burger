import { Page } from '../../components/page/page.tsx';
import { Pages } from '../../utils/constants.ts';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <Page>
    <div className='wrapper'>
      <p className='text text_type_main-large mb-4'>Page not found</p>
      <p className='text text_type_digits-large mb-4'>Error 404</p>
      <Link
        className='link text text_type_main-medium'
        to={Pages.home}
      >
        Вернуться на главную
      </Link>
    </div>
  </Page>
);
