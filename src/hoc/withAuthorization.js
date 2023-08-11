import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectIsUserAuthorized } from './../store/authorization/selectors';

export const withAuthorization = ({
    AuthorizedComponent,
    UnautorizedComponent,
}) => {
    return (props) => {
        const isAuthorized = useSelector(selectIsUserAuthorized);

        return isAuthorized ? (<AuthorizedComponent {...props} />) : (<UnautorizedComponent {...props} />);
    };
};