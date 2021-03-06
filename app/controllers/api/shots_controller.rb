# frozen_string_literal: true

module Api
  class ShotsController < Api::BaseController
    skip_before_action :verify_current_user, only: [:download]

    def index
      limit = params[:limit].presence || 10
      shots = current_user.shots.order(start_time: :desc).first(limit.to_i).pluck(:id, :start_time)

      render json: shots.map { |id, time| {clock: time.to_i, id: id} }
    end

    def download
      shot = current_user ? Shot.where(user_id: current_user.id) : Shot.joins(:user).where(users: {public: true})
      shot = shot.find_by(id: params[:shot_id])

      if shot
        allowed_attrs = %w[start_time data profile_title extra user_id drink_tds drink_ey espresso_enjoyment bean_weight drink_weight grinder_model grinder_setting bean_brand bean_type roast_date espresso_notes timeframe roast_level bean_notes]
        render json: shot.attributes.slice(*allowed_attrs)
      else
        head :unprocessable_entity
      end
    end

    def upload
      shot = Shot.from_file(current_user, params[:file])
      if shot&.save
        render json: {id: shot.id}
      else
        head :unprocessable_entity
      end
    end
  end
end
