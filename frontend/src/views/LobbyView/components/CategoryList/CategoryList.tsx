import classnames from 'classnames'

import type { CategoryGroup } from '../../../../types'
import styles from './CategoryList.module.css'

type Props = {
  selectedCategories: string[];
  categories: CategoryGroup[];
  onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const CategoryList = ({
  selectedCategories,
  categories,
  onChange,
}: Props) => (
  <div className={styles.categoryList}>
    {categories.map((categoryGroup) => (
      <div className="space-y-2">
        <div className={styles.categoryGroup}>{categoryGroup.label}</div>
        {categoryGroup.subCategories.map((option) => (
          <button
            onClick={onChange}
            value={option.value}
            className={classnames({
              [styles.categoryItem]: !selectedCategories.includes(option.value),
              [styles.categoryItemSelected]: selectedCategories.includes(
                option.value,
              ),
            })}
          >
            <span>
              {categoryGroup.label}: {option.text}
            </span>
          </button>
        ))}
      </div>
    ))}
  </div>
)
