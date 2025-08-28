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
      <div className="space-y-2" key={categoryGroup.label}>
        <div className={styles.categoryGroup}>{categoryGroup.label}</div>
        {categoryGroup.subCategories.map((option) => (
          <button
            key={option}
            onClick={onChange}
            value={option}
            className={classnames({
              [styles.categoryItem]: !selectedCategories.includes(option),
              [styles.categoryItemSelected]:
                selectedCategories.includes(option),
            })}
          >
            <span>{option}</span>
          </button>
        ))}
      </div>
    ))}
  </div>
)
