import { Route, useRouteMatch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from 'redux/categories/categoriesOperations';
import Media from 'react-media';

import styles from './DashBoardPage.module.scss';
import Navigation from 'components/Navigation';
import Balance from 'components/Balance';
import TableHome from 'components/TableHome';
import Currency from 'components/Currency';
import Header from 'components/Header';
import DiagramTab from '../../components/DiagramTab/DiagramTab';
import { fetchBalance } from 'redux/balance/balanceOperations';

export default function DashBoardPage() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <>
      <div className={styles.blur}>
        <Header />
        <div className="container">
          <div className={styles.navTableWrap}>
            <div className={styles.navBalanceCurrencyWrap}>
              <div className={styles.navBalanceWrap}>
                <div className={styles.navigation}>
                  <Navigation />
                </div>

                <Media
                  queries={{
                    small: '(max-width: 767px)',
                    other: '(min-width: 768px)',
                  }}
                >
                  {(matches) => (
                    <>
                      {matches.small && pathname === '/home/main' && (
                        <div className={styles.balance}>
                          <Balance />
                        </div>
                      )}

                      {matches.other && (
                        <div className={styles.balance}>
                          <Balance />
                        </div>
                      )}
                    </>
                  )}
                </Media>
              </div>

              <Media
                queries={{
                  small: '(max-width: 767px)',
                  other: '(min-width: 768px)',
                }}
              >
                {(matches) => (
                  <>
                    {matches.small && pathname === '/home/currency' && (
                      <Currency />
                    )}

                    {matches.other && <Currency />}
                  </>
                )}
              </Media>
            </div>
            <Route exact path={`${url}/main`}>
              <TableHome />
            </Route>
            <Route path={`${url}/statistics`}>
              <DiagramTab />
            </Route>
          </div>
        </div>
      </div>
    </>
  );
}
